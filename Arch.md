# Webapp Architecture

* Tech Stack -> Vanilla JS, ReactJS, Angular, Vue JS
* <ins>Search Engine optimization</ins> Consideration (AMP, SSR, Meta Tags, Accessbility, alt tags, H1, semantic, nav, proper content)
* <ins>Server Side Rendering Server</ins> -> Routing middleware
* <ins>Security</ins>
  * **Brute force** -> attack consists of an attacker submitting many passwords or passphrases with the hope of eventually guessing correctly.
  * **Cross Site Scripting** -> Stored and reflected
  * **Cross Site Request Forgery** -> post rest api from different browser
  * **Cross site resource sharing** -> Preflight calls to check the authentication
  * **HTTPS**
  * **Application firewall** -> filter all the suspcious request
* <ins>Accessibility</ins> -> It helps the browser to read the data
* <ins>Responsive UI</ins>
* <ins>Localization</ins>
* <ins>Performance</ins> Metrices -> FP, FCP(1.5ms), LCP, FMP, TTI(0-200ms), Total Blocking Time(total amount of time that a page is blocked from responding to user input), TTFB, Commulative Layout Shifting
* <ins>CDN</ins> for assets and <ins>Cloud Caching</ins>
* <ins>Browser Caching</ins>
* <ins>Google AMP</ins>
* <ins>Deployment strategy</ins>
* <ins>Mono Repo/Micro Frontend</ins>
* <ins>webpack</ins> and babel for older browser
* DevOps -> Jenkins/Kubernetes(load balancing)/GCP/
* <ins>Code Arch</ins>
  * **Atomic/Molecules**
  * **Module Pattern** for components
  * **Container/Presentation** Pattern/ Custom Hooks for Bussniess logic
  * **LazyLoad Pattern** Implementation
  * **Expensive work should on worker thread**
  * **Browser cache**
  * Optimized **critical rendering path** -> Async/Defer/Preload/Prefetch
  * **Content Management System (Labels/ Switch Config/Bootstrap)**
* <ins>Layer</ins>
  * Caching Layer
  * Node JS Layer
  * React Layer
  * API Layer
  * Backend Layer(it will have own structre or architecture)
  * Datebase layer (connection Bottleneck)

# Core Web Vitals/Light house
  * PWA
  * Speed - will show all metricis
  * Best Practices - Browser error, Cross origin request,
  * Performance
  * Accessbility

# Why react is better than other framwork
  * React works in <ins>**Componenets**</ins>, We can use re-use this component with very less complexity and it also help us to align developer in separetly and we can, **Complex ui with simple Components**
  * Due to React <ins>**Virtual DOM**</ins> it will update only the current elements into the dom instead of iterating whole dom with the help of Virtual DOM.
  * React itself has own <ins>**large community**</ins> for solution and new libraries.
  * React just provide us on <ins>**View layer**</ins> only, for other things like routing, http calls, state manaement we are free to use any lib or we can create own as well.
  * React also provide <ins>**React Native framework**</ins> in case if we want to go with hybrid application where we can just copy, paste and reuse the bussiness logic

# How to improve FCP
* Elemenate Rendering Blocking script using async and defer
* Minify and removed unused CSS
* Need to reduce server time response - TTFB
* Preload key request
* Serve static assets with an efficient cache policy
* Avoid an excessive DOM size
* Minimize critical request depth
* Keep request counts low and transfer sizes small

# Metricies for web app performance
* First paint
* First Containtful paint
* First meaningful paint
* Time to interaction
* TTFB
* Api response time
* Cloud Caching
* Service worker
* First CPU Idle

# Architecure for Frontend App ==>
* Tech Stack
* **SEO**
* **Cloud Caching**
* **Localization**
* **Content Delivery Network** and Google **AMP** Pages due to this page will have higher rank on Google
* Offline access i.e. **PWA** => **Service Worker** (Cache upto 50MB files)
* Accessibility
* Web Security
* Node JS Server -> **Express** -> Api call for render component(bootstrap/localization/config/component data) -> react -> initialdata with HTML (bundle information) in chunks -> Critical Rendering Path(Elemenate Render blocking things) -> **Progressive Hydration** -> idleIime -> prefetching 3rd party lib -> remaining components with lazy load behaviour ->
* Bundling Part -> webpack
* Code Quality -> Unit Testing / Chai/Enzyme/Mocha/Karma
* Service Util Layer
* Function and Non Functional requirement
* For Big app -> Micro Frontend and Mono repo
      * deployement fast
      * less chance of err
      * team dependency get reduce
      *
* Task Managment Tool -> Jira
* DevOps -> Jenkins/Kubernetes(load balancing)/GCP/
* CMS(Drupal) ->
* Kafka
* Layer -->
  * Caching Layer
  * Node JS Layer
  * React Layer
  * API Layer
  * Backend Layer(it will have own structre or architecture)
  *








