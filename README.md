# 🌀 JSVM - JavaScript Virtual Machine Obfuscator 🔐

> **Transform your JavaScript into secure stack-based bytecode**

```javascript
(function JSVM(n,r){var e=0;var t=n(r);var a=[];var c={};var u=[];var o=[];function i(n,...r){return n(...r)}function f(n){return n===0?c:u[n]?u[n]:(u[n]={},u[n])}function s(n){return i(a.push.bind(a),n)}function b(){return i(a.pop.bind(a))}function k(n){return i(o.push.bind(o),n)}function A(){return t[e++]}function v(){return t[e++]|t[e++]<<8|t[e++]<<16}function Q(){return t[e++]|t[e++]<<8|t[e++]<<16|t[e++]<<24}function d(n){return o[n]}function w(n,r){return r+n}function U(n,r){return r-n}function l(n,r){return r*n}function B(n,r){return r/n}function F(n,r){return r%n}function y(n,r){return r<n}function g(n,r){return r<=n}function G(n,r){return r>n}function h(n,r){return r>=n}function E(n,r){return r==n}function p(n,r){return r===n}function C(n,r){return r!=n}function D(n,r){return r!==n}function H(n,r){return r<<n}function J(n,r){return r>>n}function V(n,r){return r>>>n}function Z(n,r){return r^n}function j(n,r){return r&n}function x(n,r){return r|n}function L(n,r){return r in n}function S(n,r){return r instanceof n}function X(n,r){return r&&n}function Y(n,r){return r||n}function m(n){return+n}function q(n){return-n}function z(n){return!n}function I(n){return~n}function K(n,r){return f(r)[n]}function M(n,r,e){return f(e)[r]=n}function N(){const n=Q();const r=new Array(n);for(var e=0;e<n;e++){r[e]=b()}return r}function O(){const n=Q();const r={};for(let e=0;e<n;e++){const n=b();const e=b();r[n]=e}return r}function P(n,r){return r[n]}function R(n,r){const e=Q();const t=new Array(e);for(var a=0;a<e;a++){t[a]=b()}return i(r[n].bind(r,...t))}function T(){const n=Q();const r=new Array(n);for(var e=0;e<n;e++){r[e]=String.fromCharCode(b())}return i(r.join.bind(r),"")}return function n(){for(;;){var r=t[e++];if(r===undefined)break;switch(r){case 80:i(s,A());break;case 107:i(s,v());break;case 196:i(s,Q());break;case 234:i(s,undefined);break;case 111:i(s,i(d,b()));break;case 71:i(s,this);break;case 173:i(s,i(w,b(),b()));break;case 70:i(s,i(U,b(),b()));break;case 252:i(s,i(l,b(),b()));break;case 99:i(s,i(B,b(),b()));break;case 149:i(s,i(F,b(),b()));break;case 230:i(s,i(y,b(),b()));break;case 78:i(s,i(g,b(),b()));break;case 124:i(s,i(G,b(),b()));break;case 13:i(s,i(h,b(),b()));break;case 119:i(s,i(E,b(),b()));break;case 167:i(s,i(p,b(),b()));break;case 233:i(s,i(C,b(),b()));break;case 184:i(s,i(D,b(),b()));break;case 145:i(s,i(H,b(),b()));break;case 204:i(s,i(J,b(),b()));break;case 10:i(s,i(V,b(),b()));break;case 201:i(s,i(Z,b(),b()));break;case 172:i(s,i(j,b(),b()));break;case 191:i(s,i(x,b(),b()));break;case 68:i(s,i(L,b(),b()));break;case 181:i(s,i(S,b(),b()));break;case 129:i(s,i(X,b(),b()));break;case 192:i(s,i(Y,b(),b()));break;case 250:i(s,i(m,b()));break;case 156:i(s,i(q,b()));break;case 225:i(s,i(z,b()));break;case 238:i(s,i(I,b()));break;case 235:i(s,i(K,b(),b()));break;case 194:i(s,i(M,b(),b(),b(),b()));break;case 177:i(s,i(N));break;case 15:i(s,i(O));break;case 161:i(s,i(P,b(),b()));break;case 141:i(s,i(R,b(),b()));break;case 4:i(k,i(T));break}console.log(a,c)}}}).call(function(){if(typeof window!=="undefined"){return window}else if(typeof global!=="undefined"){return global}else{return new Function("return this")()}}(),(function(n){var r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var e=[];var t=0,a=0,c=0;for(var u=n.length-1;u>=0;u--){if(n.charAt(u)==="=")c++;else break}for(var u=0;u<n.length;u++){var o=n.charAt(u);if(o==="=")break;var i=r.indexOf(o);if(i===-1)continue;t=t<<6|i;a+=6;if(a>=8){a-=8;e.push(t>>a&255);t&=(1<<a)-1}}if(a>0&&c===0){e.push(t<<8-a)}return new Uint8Array(e)}),"UCFQZFBsUHJQb1BXUCBQLFBvUGxQbFBlUEgEDQAAAFAAb0dQZVBsUG9Qc1BuUG9QYwQHAAAAUAFvoVBnUG9QbAQDAAAAUAJvjQEAAAA=")();
```

# 🚀 Quick Start Guide

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/syntaxbtw/StackVM

# Navigate to project directory
cd StackVM

# Install dependencies
npm install
```

## 🛠️ Basic Usage
### 1. **Prepare your input file `resources/input.js`**:
```js
// resources/input.js
console.log('Hello, World!');
```

### 2. **Run the obfuscator:**
```bash
npm start
```

### 3. **Find output in `resources/output.js`**:
```js
// Sample obfuscated output
(function JSVM(n,r){/*...*/})(/*...*/);
```

# 📜 License
### **MIT © Syntax - https://github.com/syntaxbtw**