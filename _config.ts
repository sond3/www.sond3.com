import lume from "lume/mod.ts";
import multilanguage from "lume/plugins/multilanguage.ts";
import postcss from "lume/plugins/postcss.ts";
import postcssImport from "npm:postcss-import";
import favicon from "lume/plugins/favicon.ts";
import transformImages from "lume/plugins/transform_images.ts";

const site = lume({
    src: "./src",
    location: new URL("https://sond3.com"),
    server: {
        open: true,
        reload: true,
        port: 3000,
    },
});
site
    .copy("img")
    .copy("fonts")
    .copy("scripts")
    .copy("rrss.jpg")
    .add("/main.css")
    .add("/main.js")
    .use(transformImages({
        cache: true,
        extensions: [".jpg", ".jpeg", ".png", ".gif", ".svg", ".webp"],
    }))
    .use(postcss({
        plugins: [
            postcssImport(),
        ],
        keepDefaultPlugins: true,
    }))
    .use(favicon({
        input: "/favicon.svg",
    }))
    .use(multilanguage({
        languages: ["gl", "es", "en"],
        defaultLanguage: "gl",
    }));


export default site;
