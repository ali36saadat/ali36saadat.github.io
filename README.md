## MY PERSONAL WEBSITE - ASTERSIK THEME
![MY PERSONAL WEBSITE - Headder](https://github.com/user-attachments/assets/f8a3e5da-224d-4f09-b2ef-683edb5dfbe1)

## Usage
**Requirements:** `ruby` 3.0.0 or higher, GCC and Make (check versions using `gcc -v`,`g++ -v`, and `make -v`)


1: Install the Jekyll and bundler Gems
```
bundle install
```
or
```
gem install jekyll bundler
```
2: Add the theme to posts
```bash
git diff --name-only --diff-filter=A content..theme | xargs git checkout theme --; git restore --staged .
```
3: Run Jekyll
```
bundle exec jekyll serve
```
4: Browse to http://localhost:4000 ( or http://127.0.0.1:4000 )
