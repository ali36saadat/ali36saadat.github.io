git checkout content -- _posts/

git diff --name-only --diff-filter=A HEAD..content -- _posts | xargs -I {} git checkout content -- "{}"

bundle install

bundle exec jekyll serve