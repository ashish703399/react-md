# Points to be consider for Scalable app

* SEO consideration (amp, SSR, meta tags, accessibility tags, image alt tags, semantic ele, internal linking in breadcrumb)
  * Exactly one <h1> tag per page
  * Make sure you have a title tag per page
  *
* Accessibility
* SSR
* FP and FCP metricies
* TTFB metricies
* Mobile design
* Lazy load pattern
* CDN - Cloud Caching
* Localization
* Accessibility
* Caching on browser end - Service worker
* Design Patterns

# Metricies for web app performance
* First paint
* First Containtful page
* First meaningful page
* Time to interaction
* TTFB
* Api response time
* Cloud Caching
* Service worker
* First CPU Idle

# How to improve FCP
* Elemenate Rendering Blocking script using async and defer
* Minify and removed unused CSS
* Need to reduce server time response - TTFB
* Preload key request
* Serve static assets with an efficient cache policy
* Avoid an excessive DOM size
* Minimize critical request depth
* Keep request counts low and transfer sizes small

# While setting up new project :
*


# Architecure for Frontend App ==>
* Offline access i.e. **PWA** => **Service Worker** (Cache upto 50MB files)
* **SEO** Concern
* **Cloud Caching**
* **Localization**
* **Content Delivery Network** and Google **AMP** Pages due to this page will have higher rank on Google Crawler
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








