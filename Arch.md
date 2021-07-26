# Webapp Architecture

* Tech Stack -> Vanilla JS, ReactJS, Angular, Vue JS
* Search Engine optimization Consideration (AMP, SSR, Meta Tags, Accessbility, alt tags, H1, semantic, nav, proper content)
* Server Side Rendering Server -> Routing middleware
* Security
* Accessibility -> It helps the browser to read the data
* Responsive UI
* Localization
* Performance Metrices -> FP, LCP, FMP, TTI, TTFB
* CDN for assets and Cloud Caching
* Browser Caching
* Google AMP
* Deployment strategy
* Mono Repo/Micro Frontend
* DevOps -> Jenkins/Kubernetes(load balancing)/GCP/
* Code Arch
  * Atomic/Molecules
  * Module Pattern for components
  * Container/Presentation Pattern/ Custom Hooks for Bussniess logic
  * LazyLoad Implementation
  * Expensive should on worker thread
  * Browser cache
  * Optimized critical rendering path -> Async/Defer/Preload/Prefetch
  * Content Management System (Labels/ Switch Config/Bootstrap)
* Layer
  * Caching Layer
  * Node JS Layer
  * React Layer
  * API Layer
  * Backend Layer(it will have own structre or architecture)
  * Datebase layer (connection Bottleneck)



### Teck->SEO/SSR/Security->Mobile/Metrices->Accessbility->Design Pattern->CMS->Localization/LazyLoad->Cache->CI/CD->CDN->AMP->FrontEnd-> Atom/Molecule/

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








