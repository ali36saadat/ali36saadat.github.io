---
layout: page
permalink: /posts/
backcolor: "#ECECEC"
---

<div class="posts">
  <h2>Posts</h2>

  {% assign posts = site.posts | where_exp: "post", "post.categories contains 'posts'" %}

  {% for post in posts %}
    <div class="post-home">
      <a class="" href="{{ post.url | relative_url }}">
        <img class="post-img" src="{{ post.image | relative_url }}" alt="{{ post.title }}">
        <div class="post-info">
          <h3  class="post-title">{{ post.title }}</h3>
          <div class="post-excerpt">{{ post.excerpt }}</div>
          <div class="post-date">{{ post.date | date_to_string }}</div>
        </div>
      </a>
    </div>
  {% endfor %}
</div>