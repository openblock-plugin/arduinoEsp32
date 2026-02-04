export default Blockly => {
    Blockly.Arduino['arduino_pin_esp32SetPwmOutput'] = function (block) {
        var arg0 = block.getFieldValue('PIN') || '0';
        var arg1 = Blockly.Arduino.valueToCode(block, 'OUT', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;

        Blockly.Arduino.includes_['esp32SetPwmOutput'] = '#include <ESP32PWM.h>';
        Blockly.Arduino.definitions_['esp32SetPwmOutput' + arg0] = 'ESP32PWM pwm_' + arg0 + ';';
        Blockly.Arduino.setups_['esp32SetPwmOutput' + arg0] = 'pwm_' + arg0 + '.attachPin(' + arg0 + ', 490, 8);';

        // https://github.com/espressif/arduino-esp32/issues/11455
        // Due to this bug in esp32-arduino 3.x, we need to add a delay after attach before writing the duty.
        // Only one delay is needed, so delete and re-add it to ensure it is generated last.
        delete Blockly.Arduino.setups_['esp32LedcFix'];
        Blockly.Arduino.setups_['esp32LedcFix'] = 'delay(40);';

        var code = 'pwm_' + arg0 + '.write(' + arg1 + ');\n';
        return code;
    };

    Blockly.Arduino['arduino_pin_esp32SetDACOutput'] = function (block) {
        var arg0 = block.getFieldValue('PIN') || '0';
        var arg1 = Blockly.Arduino.valueToCode(block, 'OUT', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
        var code = 'dacWrite(' + arg0 + ', ' + arg1 + ');\n';
        return code;
    };

    Blockly.Arduino['arduino_pin_esp32ReadTouchPin'] = function (block) {
        var arg0 = block.getFieldValue('PIN') || '0';
        var code = 'touchRead(' + arg0 + ')';
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino['arduino_pin_esp32SetServoOutput'] = function (block) {
        var arg0 = block.getFieldValue('PIN') || '0';
        var arg1 = Blockly.Arduino.valueToCode(block, 'OUT', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;

        Blockly.Arduino.includes_['esp32SetServoOutput'] = '#include <ESP32Servo.h>';
        Blockly.Arduino.definitions_['esp32SetServoOutput' + arg0] = 'Servo servo_' + arg0 + ';';
        Blockly.Arduino.setups_['esp32SetServoOutput' + arg0] = 'servo_' + arg0 + '.attach' + '(' + arg0 + ');';

        delete Blockly.Arduino.setups_['esp32LedcFix'];
        Blockly.Arduino.setups_['esp32LedcFix'] = 'delay(40);';

        var code = 'servo_' + arg0 + '.write(' + arg1 + ');\n';
        return code;
    };

    Blockly.Arduino['arduino_pin_esp32AttachInterrupt'] = function (block) {
        var arg0 = block.getFieldValue('PIN') || '0';
        var arg1 = block.getFieldValue('MODE') || 'RISING';

        var branch = Blockly.Arduino.statementToCode(block, 'SUBSTACK');
        branch = Blockly.Arduino.addLoopTrap(branch, block.id);

        Blockly.Arduino.definitions_['definitions_ISR_' + arg1 + arg0] =
            'void IRAM_ATTR ISR_' + arg1 + '_' + arg0 + '() {\n' + branch + '}';

        var code = 'attachInterrupt(' + arg0 + ', ISR_' + arg1 + '_' + arg0 + ', ' + arg1 + ');\n';
        return code;
    };

    Blockly.Arduino['arduino_pin_esp32DetachInterrupt'] = function (block) {
        var arg0 = block.getFieldValue('PIN') || '0';

        var code = 'detachInterrupt(' + arg0 + ');\n';
        return code;
    };

    return Blockly;
};
