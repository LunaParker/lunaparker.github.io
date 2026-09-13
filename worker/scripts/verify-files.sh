#!/bin/zsh
# Smoke-test the files.lunaparker.dev Worker against a base URL.
#   ./scripts/verify-files.sh http://localhost:8787        (wrangler dev -c wrangler.files.toml)
#   ./scripts/verify-files.sh https://files.lunaparker.dev
# RESOLVE=files.lunaparker.dev:443:<cf-ip> bypasses a stale local DNS cache. HTML is not byte-compared
# because Cloudflare injects its bot-detection script into HTML on this zone; the JPEG check covers bytes.
B=${1:?base url}
STAGING=https://staging.lunaparker.dev
GCS=https://storage.googleapis.com/staging.lunaparker.dev
pass=0; fail=0
check() { local name=$1 expected=$2 actual=$3; if [[ "$actual" == "$expected" ]]; then echo "PASS  $name ($actual)"; ((pass++)); else echo "FAIL  $name: expected [$expected] got [$actual]"; ((fail++)); fi }
RES=(); [[ -n "$RESOLVE" ]] && RES=(--resolve "$RESOLVE")
code() { curl -s "${RES[@]}" -o /dev/null -w '%{http_code}' --max-time 20 "$@"; }
hdr() { local h=$1; shift; curl -sI "${RES[@]}" --max-time 20 "$@" | tr -d '\r' | awk -v h="$h" 'tolower($0) ~ "^"h":" {sub(/^[^:]*: */,""); print; exit}'; }
sha() { curl -s "${RES[@]}" --max-time 30 "$1" | shasum -a 256 | cut -c1-16; }

check "mockup index page 200"      200 "$(code "$B/pmha-homepage-redesign/1/")"
check "mockup index content-type"  "text/html" "$(hdr content-type "$B/pmha-homepage-redesign/1/")"
check "explicit index.html 200"    200 "$(code "$B/pmha-homepage-redesign/1/index.html")"
check "dir without slash 301"      301 "$(code "$B/pmha-homepage-redesign/1")"
check "dir without slash location" "$B/pmha-homepage-redesign/1/" "$(hdr location "$B/pmha-homepage-redesign/1")"
check "missing file 404"           404 "$(code "$B/nope-does-not-exist.txt")"
check "missing dir 404"            404 "$(code "$B/nope-dir")"
check "root 404 (no root index)"   404 "$(code "$B/")"
check "POST 405"                   405 "$(code -X POST -d x "$B/uploads/")"
check "HEAD 200"                   200 "$(code -I "$B/pmha-homepage-redesign/1/")"
check "query string passthrough"   200 "$(code "$B/pmha-homepage-redesign/1/?cb=$RANDOM")"
check "range request 206"          206 "$(code -H 'Range: bytes=0-9' "$B/pmha-homepage-redesign/1/index.html")"
check "jpeg content-type"          "image/jpeg" "$(hdr content-type "$B/uploads/100570.jpg")"
check "jpeg bytes match staging"   "$(sha "$STAGING/uploads/100570.jpg")" "$(sha "$B/uploads/100570.jpg")"
check "jpeg bytes match bucket"    "$(sha "$GCS/uploads/100570.jpg")"     "$(sha "$B/uploads/100570.jpg")"
echo "== $pass passed, $fail failed"
exit $fail
