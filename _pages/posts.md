---
layout: page
permalink: /posts/
backcolor: "#ECECEC"
---

<div>
  <h2>Posts</h2>
  {% assign posts = site.posts | where_exp: "post", "post.categories contains 'posts'" %}

  {% for post in posts limit:3 %}

    <div class="post-home">
        <a class="" href="{{ post.url | relative_url }}">

      <img class="img-post" src="{{ post.image | relative_url }}" alt="{{ post.title }}">
      <h3 class="post-title">
          {{ post.title }}
      </h3>
      <span class="post-home-date">
        {{ post.date | date_to_string }}
      </span>
        </a>

    </div>

  {% endfor %}
</div>