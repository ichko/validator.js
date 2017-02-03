class Validator {

    constructor() {
        this.validations = { };
        this.filters = { };
        this.extractors = { };
        this.effects = { };
    }

    validation(name, ...rules) {
        this.validations[name] = rules;
        return this;
    }

    filter(name, filter) {
        this.filters[name] = filter;
        return this;
    }

    extractor(extractor) {
        this.extractors[extractor.name] = extractor;
        return this;
    }

    effect(name, ...effects) {
        this.effects[name] = effects;
        return this;
    }

    validate({ elements, validationName, effectName, dependencies, extractorName, params }) {
        elements.forEach(element => {
            let errors = [],
                extractor = this.extractors[extractorName] || (x => x),
                input = { element, dependencies, params };
            element = extractor(element);

            this.validations[validationName].forEach(rule => {
                let filter = this.filters[rule.filter] || (_ => true);
                if (filter(input) && !rule.handler(input)) {
                    errors.push(rule.message(input));
                }
            });

            let effectHandlerName = errors.length == 0 ? 'success' : 'error';
            this.effects[effectName].forEach(effect => {
                effect[effectHandlerName]({ element, errors, params, dependencies });
            });
        });
    }

}
