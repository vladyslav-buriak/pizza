declare module "*.png" {
    const content: any;
    export default content;
  }

  declare module "*.scss" {
    const classes: Record<string, string>;
    export default classes;
  }
  
 