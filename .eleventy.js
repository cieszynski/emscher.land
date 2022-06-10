const Image = require("@11ty/eleventy-img");
const prettier = require("prettier");
const path = require("path");


async function imageShortcode(src, alt, sizes) {
  let metadata = await Image(src, {
    widths: [480, 800, null],
    formats: ["webp", "png", "jpeg", "svg"],
    urlPath: "/assets/img/",
    outputDir: "./_site/assets/img/"
  });

  let imageAttributes = {
    alt,
    sizes: "(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 800px",
    loading: "lazy",
    decoding: "async",
  };

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return Image.generateHTML(metadata, imageAttributes, {
    whitespaceMode: "inline"
  });
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets");

  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addLiquidShortcode("image", imageShortcode);
  eleventyConfig.addJavaScriptFunction("image", imageShortcode);

  eleventyConfig.addCollection("categories", function (collectionApi) {
    return collectionApi.getFilteredByTag("category");
  });

  eleventyConfig.addCollection("bydate", function (collectionApi) {
    return collectionApi.getAll().filter(function (item) {
      // return only posts:
      return /_pages/.test(item.data.page.inputPath);
    }).sort(function (a, b) {
      return b.date - a.date; // sort by date - descending
    });
  });

  eleventyConfig.addTransform("prettier", function (content, outputPath) {
    const extname = path.extname(outputPath);
    console.log(extname)
    switch (extname) {
      case ".html":
      case ".json":
        // Strip leading period from extension and use as the Prettier parser.
        const parser = extname.replace(/^./, "");
        console.log("OK")
        return prettier.format(content, { parser: parser, tabWidth: 4 });

      default:
        return content;
    }
  });

  return {
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  }
};