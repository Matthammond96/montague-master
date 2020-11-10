let Components = {};

// Core
Components['banner'] = require('./Core/Banner').default;
Components['titleParagraph'] = require('./Core/TitleParagraph').default;
Components['imageText'] = require('./Core/ImageText').default;
Components['featuredProperties'] = require('./Core/FeaturedProperties').default;
Components['carousel'] = require('./Core/Carousel').default;
Components['customHtml'] = require('./Core/CustomHTML').default;
Components['verticalSpacer'] = require('./Core/VerticalSpacer').default;
Components['videoBanner'] = require('./Core/VideoComponent').default;
Components['teams'] = require('./Core/Teams').default;
Components['contactForm'] = require('./Core/ContactForm').default;
Components['gridContainer'] = require('./Core/gridContainer').default;
Components['pressContainer'] = require('./Core/pressContainer').default;
Components['staticImage'] = require('./Core/StaticImage.js').default;

// Property Listings
Components['propertyListings'] = require('./Properties/Listings').default;
Components['property'] = require('./Properties/Property').default;
Components['tabbedContent'] = require('./Properties/PropertyToggle').default;
Components['subProperties'] = require('./Properties/SubProperties').default;
Components['imageGallery'] = require('./Core/ProductGallery').default;
Components['videoBanner'] = require('./Core/VideoComponent').default;
Components['gridContainer'] = require('./Core/gridContainer').default;
Components['ourServices'] = require('./Core/Services').default;
Components['propertyVrTour'] = require('./Properties/VR').default;

// Destinations
Components['destinationListings'] = require('./Destinations/Destination').default;
Components['destination'] = require('./Destinations/Destination').default;

// Services
Components['ourServices'] = require("./Core/Services").default;

// Blog
Components['blogLandingPage'] = require("./Core/BlogLandingPage").default;
Components['articleLoader'] = require("./Core/ArticleLoader").default;

export default Components