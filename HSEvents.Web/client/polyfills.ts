import 'core-js/es6';
import 'core-js/es7/reflect';

//if (process.env.ENV === 'production') {
    // Production
//} else {
    // Development and test
    Error['stackTraceLimit'] = Infinity;
//}