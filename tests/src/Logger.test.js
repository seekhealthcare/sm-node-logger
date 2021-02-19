import Logger from '../../src/Logger';

describe('Logger', () => {
  describe('when new Logger is created without params:', () => {
    const logger = new Logger();

    it('should not have "loggerLabel" property', () => {
      expect(logger.loggerLabel).toBe('');
    });

    it('should have "instance" property', () => {
      expect(logger).toHaveProperty('instance');
    });
  });

  describe('when new Logger is created passing "loggerLabel" param:', () => {
    const loggerLabel = 'test';
    const logger = new Logger({ loggerLabel });
    const loggerInstance = logger.getInstance();

    it('should have "loggerLabel" property', () => {
      expect(logger.loggerLabel).toBe(loggerLabel);
    });

    describe('when "getInstance()" is called:', () => {
      it('instance should have certain log level properties', () => {
        expect(loggerInstance).toHaveProperty('error');
        expect(loggerInstance).toHaveProperty('warn');
        expect(loggerInstance).toHaveProperty('info');
        expect(loggerInstance).toHaveProperty('debug');
      });
    });

    describe('when try log text:', () => {
      it('should not throw', () => {
        expect(() => loggerInstance.error('some text')).not.toThrow();
        expect(() => loggerInstance.warn(['some text', 'another text'])).not.toThrow();
        expect(() => loggerInstance.info({ test: 'some text' })).not.toThrow();
        expect(() => loggerInstance.debug(new Error())).not.toThrow();
      });
    });
  });
});
