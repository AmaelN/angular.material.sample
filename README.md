# Config for WebStorm

## Installing tsd

```
npm install typings --global
typings  init
```

## Include Typing

It helps typescript to know the keyword for angular. So the compiler does not generate errors.

```
typings install angular angular-material  --ambient --save-dev
```

## Bower

We will create the configuration file for Bower and add the **angular-material** dependency.

```
bower init
bower install angular-material --save
```

### refresh bower

```
bower update
```

### Include .bowerrc

Need to create a file name *.bowerrc* and include the following text

```
{
  "directory": "app/bower_components",
  "scripts":{
      "postinstall": "gulp wiredep"
  }
}
```

## Install typescript

```
npm install -g typescript
npm update -g typescript
```

 use the following config in the *tsconfig.json*

```
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es5",
    "removeComments": true,
    "sourceMap": true,
    "emitDecoratorMetadata" :true,
    "experimentalDecorators": true
  },
  "exclude": [
    "node_modules",
    "app/bower_components",
    "typings/browser.d.ts",
    "typings/browser"
  ]
}
```


## Internationalization

 adds angular-translate library
```
bower install --save angular-translate messageformat
```

## Install Gulp

 Install gulp globally
```
npm install -g gulp

```

Install gulp for a specific project locally
```
npm install --save-dev gulp
```

## Automatic include of dependencies

Install Wiredep

```
npm install --save-dev wiredep gulp-inject
```

## Gulp help

```
npm install --save-dev gulp-task-listing
```