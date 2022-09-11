const previous_operation_text = document.querySelector("#previous__operation"),
    current_operation_text = document.querySelector("#current__operation"),
    calculator_keys = document.querySelectorAll(".buttons__row button");

export class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";

        this.init();
    }

    init() {
        calculator_keys.forEach(function (button) {
            button.addEventListener("click", (e) => {
                const value = e.target.innerText;

                if (+value >= 0 || value === ".")
                    calc.addDigit(value);
                else
                    calc.processOperation(value);
            });
        });
    }

    addDigit(digit) {
        // verifica se o dígito já possui um ponto
        if (digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }

        this.currentOperation = digit;
        this.updateScreen();
    }

    // processa todas as operações
    processOperation(operation) {
        // verifica se o valor é vazio
        if (this.currentOperationText.innerText === "" && operation !== "C") {
            // muda a operação
            if (this.previousOperationText.innerText !== "") {
                this.changeOperation(operation);
            }
            return;
        }

        // pega o valor anterior e o atual
        let operationValue;
        let previous = +this.previousOperationText.innerText.split(" ")[0];
        let current = +this.currentOperationText.innerText;

        // operações
        switch (operation) {
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "DEL":
                this.processDelOperator();
                break;
            case "CE":
                this.processClearCurrentOperator();
                break;
            case "C":
                this.processClearOperator();
                break;
            case "=":
                this.processEqualOperator();
                break;
            default:
                return;
        }
    }

    // atualiza o valor dos números na tela
    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null
    ) {
        if (operationValue === null) {
            // adiciona um número para o valor atual
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            if (previous === 0) {
                operationValue = current;
            }
            // adiciona o valor atual ao valor anterior
            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";
        }
    }

    // muda a operação
    changeOperation(operation) {
        const mathOperations = ["*", "-", "+", "/"];

        if (!mathOperations.includes(operation)) {
            return;
        }

        this.previousOperationText.innerText =
            this.previousOperationText.innerText.slice(0, -1) + operation;
    }

    // deleta um dígito
    processDelOperator() {
        this.currentOperationText.innerText =
            this.currentOperationText.innerText.slice(0, -1);
    }

    // limpa a operação atual
    processClearCurrentOperator() {
        this.currentOperationText.innerText = "";
    }

    // Limpa todas as operações
    processClearOperator() {
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }

    // Processa a operação
    processEqualOperator() {
        let operation = this.previousOperationText.innerText.split(" ")[1];

        this.processOperation(operation);
    }
}

export const calc = new Calculator(previous_operation_text, current_operation_text);