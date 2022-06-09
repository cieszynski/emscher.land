const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt, sizes) {
  let metadata = await Image(src, {
    widths: [480, 800, null],
    formats: ["webp", "avif", "png", "jpeg", "svg"],
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
};