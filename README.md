
git diff --name-only --diff-filter=A content..theme | xargs -I {} git  checkout theme -- "{}"

bundle install

bundle exec jekyll serve