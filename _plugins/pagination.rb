module Jekyll
  class Pagination < Generator
    safe true
    priority :lowest

    def generate(site)
      collection_pages = site.collections.fetch("pages", nil)&.docs || []
      pagination_sources = site.pages + collection_pages
      paginated_pages = pagination_sources.select do |page|
        page.data.dig("pagination", "enabled")
      end

      paginated_pages.each { |page| paginate(site, page) }
    end

    private

    def paginate(site, page)
      settings = page.data.fetch("pagination")
      category = settings.fetch("category")
      per_page = settings.fetch("per_page", 5).to_i
      return if per_page < 1

      posts = site.posts.docs.select do |post|
        Array(post.data["categories"]).include?(category)
      end.sort_by(&:date).reverse

      total_pages = [(posts.length.to_f / per_page).ceil, 1].max
      (1..total_pages).each do |page_number|
        page_path = pagination_path(page, settings, page_number)
        offset = (page_number - 1) * per_page
        page_posts = posts.slice(offset, per_page) || []
        paginator = paginator_data(posts, page_posts, page_number, total_pages, per_page, page, settings)

        if page_number == 1
          assign_pager(page, paginator)
        else
          generated_page = build_page(site, page, settings, page_path, paginator)
          site.pages << generated_page
        end
      end
    end

    def pagination_path(page, settings, page_number)
      return page.url if page_number == 1

      path = settings.fetch("permalink", "/page/:num/").gsub(":num", page_number.to_s)
      path.start_with?("/") ? path : "/#{path}"
    end

    def paginator_data(posts, page_posts, page_number, total_pages, per_page, page, settings)
      previous_page = page_number > 1 ? page_number - 1 : nil
      next_page = page_number < total_pages ? page_number + 1 : nil
      trail_before = settings.fetch("trail_before", 1).to_i
      trail_after = settings.fetch("trail_after", 1).to_i
      first_trail_page = [page_number - trail_before, 1].max
      last_trail_page = [page_number + trail_after, total_pages].min
      page_path = ->(number) { pagination_path(page, settings, number) }

      {
        "page" => page_number,
        "per_page" => per_page,
        "posts" => page_posts,
        "total_posts" => posts.length,
        "total_pages" => total_pages,
        "first_page" => 1,
        "first_page_path" => page_path.call(1),
        "last_page" => total_pages,
        "last_page_path" => page_path.call(total_pages),
        "previous_page" => previous_page,
        "previous_page_path" => previous_page && page_path.call(previous_page),
        "next_page" => next_page,
        "next_page_path" => next_page && page_path.call(next_page),
        "page_trail" => (first_trail_page..last_trail_page).map do |number|
          { "num" => number, "path" => page_path.call(number), "title" => "Page #{number}" }
        end
      }
    end

    def build_page(site, source_page, settings, page_path, paginator)
      relative_path = page_path.sub(%r{\A/}, "").sub(%r{/\z}, "")
      directory = File.dirname(relative_path)
      directory = "" if directory == "."
      generated_page = PageWithoutAFile.new(site, site.source, directory, "index.html")
      generated_page.content = source_page.content
      generated_page.data = source_page.data.dup
      generated_page.data["pagination"] = settings.merge("enabled" => false)
      generated_page.data["permalink"] = page_path
      generated_page.pager = paginator
      generated_page
    end

    def assign_pager(page, paginator)
      if page.respond_to?(:pager=)
        page.pager = paginator
      else
        page.define_singleton_method(:pager) { @category_pager }
        page.instance_variable_set(:@category_pager, paginator)
      end
    end
  end
end