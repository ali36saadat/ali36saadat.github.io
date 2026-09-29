---
layout: page
permalink: /repositories/
backcolor: "#ECECEC"
---

<div class="posts">
  <h2>Repositories</h2>

  {% assign repositories = site.posts | where_exp: "post", "post.categories contains 'repositories'" %}

  {% for post in repositories %}
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