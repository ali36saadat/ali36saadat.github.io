git checkout content -- _posts/

git diff --name-only --diff-filter=A HEAD..content -- _posts |
while read -r file; do
    target="${file/_posts\//_drafts/}"
    mkdir -p "$(dirname "$target")"
    git show "content:$file" > "$target"
done

bundle install

bundle exec jekyll serve