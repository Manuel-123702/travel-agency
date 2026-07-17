import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";

import homepage from "./homepage";
import country from "./country";
import service from "./service";
import blog from "./blog";
import faq from "./faq";
import testimonial from "./testimonial";
import settings from "./settings";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([
    homepage,
    country,
    service,
    blog,
    faq,
    testimonial,
    settings,
  ]),
});
