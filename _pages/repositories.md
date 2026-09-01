---
layout: page
permalink: /repositories/
backcolor: "#ECECEC"
---

<div>
  <h2>Repositories</h2>
  {% assign repositories = site.posts
    | where_exp: "post", "post.categories contains 'repositories'"
  %}

  {% for post in repositories %}

    <div class="post-home">

      <a href="{{ post.url | relative_url }}">

        <img
          class="img-post"
          src="{{ post.image | relative_url }}"
          alt="{{ post.title }}"
        >

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