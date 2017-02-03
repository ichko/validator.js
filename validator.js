class Validator {
    
    constructor() {
        this.validations = { };
        this.extractors = { };
        this.effects = { };
    }
    
    validation(name, ...rules) {
        this.rules[name] = rules;
        return this;
    }
    
    extractor(extractor) {
        this.extractors[extractor.name] = extractor;
        return this
    }
    
    effect (name, ...effects) {
        this.effects[name] = effects;
        return this
    }
    
    validate({ elements, validation, effect, dependencies, extractor = (x => x) }) {
        elements.forEach(element => {
            let errors = [];
            
            this.validations[validation].forEach(rule => {
                let value = extractor(element, dependencies);
                if (!rule.handler(value, dependencies)) {
                    errors.push(rule.message(value));
                }
            });
            
            let effectHandlerName = errors.length > 0 ? 'success' : 'error';
            this.effects[effect].forEach(effect => {
                effect[effect](element, errors, dependencies);
            });
        });
    }
    
}
