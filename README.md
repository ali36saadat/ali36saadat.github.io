## MY PERSONAL WEBSITE - ASTERSIK THEME
![REINFORCEMENT LEARNING - Headder](https://github.com/user-attachments/assets/fc926234-6bd1-4735-8690-2ae3bc33b373)

## Usage
**Requirements:** `ruby` 2.7.0 or higher, GCC and Make (check versions using `gcc -v`,`g++ -v`, and `make -v`)


1: Install the Jekyll and bundler Gems
```
bundle install
```
or
```
gem install jekyll bundler
```
2: Add posts to the theme
```bash
git diff --name-only --diff-filter=A HEAD..content -- _posts | xargs git checkout content --; git restore --staged _posts
```
3: Run Jekyll
```
bundle exec jekyll serve --draft --livereload
```
4: Browse to http://localhost:4000 ( or http://127.0.0.1:4000 )
