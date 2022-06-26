import { InjectionToken } from "@angular/core";

export const ENDPOINT_URL = new InjectionToken<string>(
    "ENDPOINT_URL - The url of the endpoint for server requests"
);

export const MOCK_MODE = new InjectionToken<boolean>(
    "MOCK_MODE - Using mock data, without server support"
);
