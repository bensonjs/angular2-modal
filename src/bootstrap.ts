import {provide, ComponentRef} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {ELEMENT_PROBE_PROVIDERS} from '@angular/platform-browser';

// Register providers for browser, this is mandatory.
import {MODAL_BROWSER_PROVIDERS} from './components/angular2-modal/platform-browser';

import {App} from './demo/app/app';

let _bootstrapped = false;

export function main(): Promise<ComponentRef<App>> {
    if (_bootstrapped) {
        return <any>Promise.reject(null);
    } else {
        _bootstrapped = true;
        return bootstrap(App, [
            ...MODAL_BROWSER_PROVIDERS,
            ROUTER_PROVIDERS,
            provide(LocationStrategy, {useClass: HashLocationStrategy}),
            ELEMENT_PROBE_PROVIDERS // remove in production
        ])
            .catch(err => console.error(err));    
    }
    
}

export function isBootstrapped(): boolean {
    return _bootstrapped;
}

document.addEventListener('DOMContentLoaded', main);
