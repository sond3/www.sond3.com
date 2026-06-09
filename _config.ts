import lume from "lume/mod.ts";
import multilanguage from "lume/plugins/multilanguage.ts";
import postcss from "lume/plugins/postcss.ts";
import postcssImport from "npm:postcss-import";
import postcssCustomMedia from "npm:postcss-custom-media";
import cssnano from "npm:cssnano";
import favicon from "lume/plugins/favicon.ts";
import transformImages from "lume/plugins/transform_images.ts";
import esbuild from "lume/plugins/esbuild.ts";
import minifyHTML from "lume/plugins/minify_html.ts";

const isProduction = Deno.env.get("LUME_ENV") === "production";

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
    .copy("rrss.jpg")
    .add("/main.css")
    .add("/main.js")
    .use(esbuild({
        options: {
            bundle: true,
            minify: isProduction,
        },
    }))
    .use(transformImages({
        cache: true,
        extensions: [".jpg", ".jpeg", ".png", ".gif", ".svg", ".webp"],
    }))
    .use(postcss({
        plugins: [
            postcssImport(),
            postcssCustomMedia(),
            ...(isProduction ? [cssnano()] : []),
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

if (isProduction) {
    site.use(minifyHTML());
}

export default site;
