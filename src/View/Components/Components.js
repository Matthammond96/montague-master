let Components = {};

// Core
Components['banner'] = require('./Core/Banner').default;
Components['titleParagraph'] = require('./Core/TitleParagraph').default;
Components['imageText'] = require('./Core/ImageText').default;
Components['featuredProperties'] = require('./Core/FeaturedProperties').default;
Components['carousel'] = require('./Core/Carousel').default;
Components['customHtml'] = require('./Core/CustomHTML').default;
Components['verticalSpacer'] = require('./Core/VerticalSpacer').default;

// Property Listings
Components['propertyListings'] = require('./Properties/Listings').default;
Components['property'] = require('./Properties/Property').default;

export default Components