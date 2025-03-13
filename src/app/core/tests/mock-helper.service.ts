import { MockFactory } from 'jasmine-mock-factory-newer';

function mockServiceUsingFactory(serviceClass) {
    return {
        provide: serviceClass,
        useFactory: () => MockFactory.create(serviceClass)
    };
}


export function mockServices(...args) {
    const services = Array.isArray(args[0])
        ? args[0]
        : args;

    return services.map(service => mockServiceUsingFactory(service));
}
