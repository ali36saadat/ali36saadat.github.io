---
layout: page
permalink: /posts/
backcolor: "#ECECEC"
pagination:
  enabled: true
  category: posts
  per_page: 5
  permalink: /posts/page/:num/
  trail_before: 1
  trail_after: 1
---

<div class="posts">
  <h2>Posts</h2>

  {% for post in paginator.posts %}
    <div class="post-home">
      <a class="" href="{{ post.url | relative_url }}">
        <img class="post-img" src="{{ post.image | relative_url }}" alt="{{ post.title }}">
        <div class="post-info">
          <h2  class="post-title">{{ post.title }}</h2>
          <div class="post-excerpt">{{ post.excerpt }}</div>
          <div class="post-date">{{ post.date | date_to_string }}</div>
        </div>
      </a>
    </div>
  {% endfor %}
</div>

{% include pagination.html label="Post pages" %}