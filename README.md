# validator.js
Simple js validation library

## Example

```javascript
let validator = new Validator()

    .filter('filters.range', ({ element }) => element.type == 'number')

    .validation('main.validation', {
            handler: ({ element }) => element.value == 'valid',
            message: ({ element }) => `'${ element.name }' is not valid`
        }, {
            handler: ({ element, params: { required }}) => required && element.value != '',
            message: ({ element }) => `'${ element.name }' is required`
        }, {
            filter: 'filters.range',
            handler: ({ element, params: { range }}) =>
                element.value > range.min && element.value < range.max,
            message: ({ element, params: { range }}) =>
                `'${ element.name }' should be in range ${ range.min } - ${ range.max }`
        }
    )

    .effect('main.output', {
            error: ({ errors, dependencies: { container }}) =>
                container.log(errors.join(', ')),
            success: ({ element, dependencies: { container }}) =>
                container.log(`'${ element.name }' is valid`)
        }
    );


let fields = [
    { value: 'valid', name: 'validField' },
    { value: 'invalid', name: 'invalidField' },
    { value: '', name: 'requiredField' },
    { value: 15, name: 'rangeField', type: 'number' }
];

validator.validate({
    elements: fields,
    dependencies: { container: console },
    
    validationName: 'main.validation',
    effectName: 'main.output',
    
    params: {
        required: true,
        range: { min: 5, max: 10 }
    }
});
```

## Console output
 - 'validField' is valid
 - 'invalidField' is not valid
 - 'requiredField' is not valid, 'requiredField' is required
 - 'rangeField' is not valid, 'rangeField' should be in range 5 - 10
