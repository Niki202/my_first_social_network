declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
}
declare module "*.svg" {
    const content: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>>;
    export default content;
}

declare module "*.webp" {
    const content: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>>;
    export default content;
}