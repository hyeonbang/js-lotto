export class StateModel {
    condition = {
        restarted: false,
        reseted: false,
        purchased: false
    };
    numbers = {
        lastNumbers: [],
        lastBonusNumber: [],
        numberSet: [],
        numberSetManuel: []
    };
    purchased = {
        price: 0,
        purchasedUnit: 0
    };
    #observers = new Set();

    constructor() {
    }

    reset() {
        this.resetState();
        this.#observers = new Set();
    }

    resetState() {
        const states = [
            {
                state: this.condition,
                value: false
            },
            {
                state: this.numbers,
                value: []
            },
            {
                state: this.purchased,
                value: 0
            },
        ];

        states.forEach(({ state, value }) => {
            Object.keys(state).forEach(prop => this.#setState(state, prop, value));
        });
    }

    register(subscriber) {
        this.#observers.add(subscriber);
    }

    #setState(state, prop, value) {
        state[prop] = value;

        if (state.hasOwnProperty(prop)) {
            Object.defineProperty(state, prop, {
                configurable: true,
                writable: true,
                enumerable: true,
                value
            });

            this.#notify(prop, state[prop]);
        }
    }

    setConditionState(prop, value) {
        this.#setState(this.condition, prop, value);
    }

    setNumbersState(prop, value) {
        this.#setState(this.numbers, prop, value);
    }

    setPurchasedState(prop, value) {
        this.#setState(this.purchased, prop, value);
    }

    #notify(key, value) {
        if (value === true) {
            const fn = () => [...this.#observers]
                .filter(observer => Object.keys(observer)[0] === key)
                .forEach(observer => observer[key]());
            return fn();
        }
    }
}