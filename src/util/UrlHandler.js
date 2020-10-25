const UrlHandler = () => {

    const PLAN = "TIER_ONE";
    const URL = "https://api.football-data.org/v2";
    const KEY_API = "8b8a2fbcb3ad4248adfa017a4767cf11";
    const URL_FILTERS = [];
    let END_POPINT = [];
    let HEADERS = {};


    // NO
    const addPlanParam = () => addParam("plan", PLAN);

    const addParam = (key, value) => {
        const paramsValue = key + "=" + value;
        URL_FILTERS.push(paramsValue);
    };

    const getParams = () => [...URL_FILTERS];

    // NO
    const getParamsStrg = () => {
        addPlanParam();
        return URL_FILTERS.join("&")
    };

    const addEndPointVal = (newParam) => {
        END_POPINT.push(newParam);
    }
    const removeEndPointVal = (pEndpoint) => {
        END_POPINT = END_POPINT.filter(ep => ep.toLowerCase() !== pEndpoint.toLowerCase());
    }
    const getEndPointVals = () => [...END_POPINT];

    //  NO
    const parsedEndpointsToStrng = () => END_POPINT.join("/");

    const getCustomURL = (endPoint = false, params = false) => {
        let urlRes = URL;
        if (endPoint) urlRes = urlRes.concat("/", parsedEndpointsToStrng()); // should get end poinr setted into the obj
        if (params) urlRes = urlRes.concat("?", getParamsStrg());
        return urlRes;
    }
    // HEADERS
    const addHeaders = (key, value) => {
        HEADERS[key] = value;
    };
    const getHeaders = () => {
        addHeaders("X-Auth-Token", KEY_API);
        return HEADERS
    };  
    const removeHeader = (key) => HEADERS = HEADERS.filter(hName => hName !== key);
    const removeAllHeaders = () => HEADERS = [];

    return {
        getCustomURL,
        addParam,
        getParams,
        addEndPointVal,
        removeEndPointVal,
        getEndPointVals,
        addHeaders,
        removeHeader,
        removeAllHeaders,
        getHeaders
    }
}

export default UrlHandler;