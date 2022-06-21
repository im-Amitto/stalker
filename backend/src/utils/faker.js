import { faker } from '@faker-js/faker';

export const getfakeUserName = () => {
    return faker.internet.userName().substring(0,6);
}

export const getFakeEmail = () => {
    return faker.internet.email();
}

export const getFakePassword = () => {
    return faker.internet.password(5);
}