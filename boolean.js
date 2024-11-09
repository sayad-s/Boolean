function hasProperties(obj, arr) {
    let res = {};
    if ((typeof obj != 'object' || obj == null || (Array.isArray(obj))) || (!Array.isArray(arr))) {
        return res;
    }

    for (let path of arr) {
        if (path.indexOf('.') != -1) {
            let keys = path.split('.');
            let current = obj;
            let flag = true;

            for (let key of keys) {
                if (current[key]) {
                    current = current[key];
                } else {
                    flag = false;
                    break;
                }
            }

            res[path] = flag;
        }
        else {
            res[path] = path in obj;;
        }
    }
    return res;
}

let obj = {
    name: 'John',
    age: 25,
    address: {
        state: 'California',
        city: 'San Francisco',
        house: {
            number: 136,
            suite: 'suburb 2',
        }
    }
};

// let arr = ['country', 'name', 'age', 'address.state', 'address.city', 'name.abc', 'address.suite', 'address.house.suite'];

// console.log(hasProperties(obj, arr));

function filterFalsyValues(arr) {
    if (!Array.isArray(arr)) {
        throw new Error('Is not an array');
    }
    let res = arr.filter(x => Boolean(x));
    return res;
}

function mapToBoolean(arr) {
    if (!Array.isArray(arr)) {
        throw new Error('Is not an array');
    }
    let res = arr.map(elem => elem = !!elem );
    return res;
}

// let arr2 = [0, 1, "", "hello", null, undefined, false, 42]

// console.log(filterFalsyValues(arr2));
// console.log(mapToBoolean(arr2));  

const schema = {
    name: { type: 'string', minLength: 3, },
    age: { type: 'number', min: 18, },
    isActive: { type: 'boolean', },
    tags: { type: 'array', itemType: 'string', },
};

let user = {
    name: 'Sayad',
    age: 17,
    isActive: true,
    tags: ['user', 'Picsart'],
};
function validateSchema(obj, schema) {
    if (typeof obj != 'object' || typeof schema != 'object') {
        return false;
    }
    
    for (let key in schema) {
        let value = obj[key];
        let must = schema[key];
        
        if (Array.isArray(value)) {
            for (let elem of value) {
                if (typeof elem != 'string') {
                    return false;
                }
            }
        } else {
            if (typeof value != must.type) {
                return false;
            }
        }

        if (must.type == 'string') {
            if (must.minLength != undefined && value.length < must.minLength) {
                return false;
            }
            else if (must.maxLength != undefined && value.length > must.maxLength) {
                return false;
            }
        }

        if (must.type == 'number') {
            if (must.max != undefined && value > must.max) {
                return false;
            }
            else if (must.min != undefined && value < must.min) {
                return false;
            }
        }

    }

    return true;
}

// console.log(validateSchema(user, schema));