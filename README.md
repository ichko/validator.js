## validator.js
Simple js validation library

# Example

```javascript
let validator = new Validator()

    .validation('main.validation', {
            handler: element => element.value == 'valid',
            message: element => `'${ element.name }' is not valid`
        }, {
            handler: element => element.value != '',
            message: element => `'${ element.name }' is required`
        }
    )

    .effect('main.output', {
            error: (_, errors, { container }) =>
                container.log(errors.join(', ')),
            success: (element, _, { container }) =>
                container.log(`'${ element.name }' is valid`)
        }
    );


let fields = [
    { value: 'valid', name: 'validField' },
    { value: 'invalid', name: 'invalidField' },
    { value: '', name: 'requiredField' }
];

validator.validate({
    elements: fields,
    dependencies: { container: console },
    
    validation: 'main.validation',
    effect: 'main.output',
});

```

## Console output
 - 'validField' is valid
 - 'invalidField' is not valid
 - 'requiredField' is not valid, 'requiredField' is required