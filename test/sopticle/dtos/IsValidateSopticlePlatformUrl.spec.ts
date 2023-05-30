import {
  validateBrunchURL,
  validateTistoryURL,
  validateVelogURL,
} from '../../../src/sopticle/dtos/create-sopticle.dto';

describe('IsValidateSopticlePlatformUrl', () => {
  describe('Velog Sopticle 주소 Validation,', () => {
    it('정상적인 Velog Post라면 True를 리턴한다,', () => {
      expect(
        validateVelogURL('https://velog.io/@soptcom/soptcom-1'),
      ).toBeTruthy();
    });

    it('url 마지막 문자 / 가 있어도 true를 리턴한다', () => {
      expect(
        validateVelogURL('https://velog.io/@soptcom/soptcom-1/'),
      ).toBeTruthy();
    });

    it('url 마지막 문자에 / 가 2개 라면 false를 리턴한다', () => {
      expect(
        validateVelogURL('https://velog.io/@soptcom/soptcom-1//'),
      ).toBeFalsy();
    });

    it('두번째 파라미터 prefix엔 @가 없으면 false를 리턴한다.', () => {
      expect(validateVelogURL('https://velog.io/testtest/test-1')).toBeFalsy();
    });
    it('3번째 파라미터는 부터는 없어야한다.', () => {
      expect(
        validateVelogURL('https://velog.io/soptcom/soptcom-1/test'),
      ).toBeFalsy();
    });
  });

  describe('Tistory Sopticle 주소 Validation', () => {
    it('정상적인 Tistory Post라면 True를 리턴한다,', () => {
      expect(validateTistoryURL('https://soptcom.tistory.com/1')).toBeTruthy();
    });

    it('정상적인 Tistory Post라면 True를 리턴한다22,', () => {
      expect(
        validateTistoryURL('https://sancheck-developer.tistory.com/72'),
      ).toBeTruthy();
    });

    it('url 마지막 문자 / 가 있어도 true를 리턴한다', () => {
      expect(validateTistoryURL('https://soptcom.tistory.com/1/')).toBeTruthy();
    });
    it('url 마지막 문자에 / 가 2개 라면 false를 리턴한다', () => {
      expect(validateTistoryURL('https://soptcom.tistory.com/1//')).toBeFalsy();
    });

    it('subdomain이 없으면 false를 리턴한다.', () => {
      expect(validateTistoryURL('https://tistory.com/1')).toBeFalsy();
    });
  });

  describe('Brunch Sopticle 주소 Validation', () => {
    it('정상적인 Brunch Post라면 True를 리턴한다,', () => {
      expect(validateBrunchURL('https://brunch.co.kr/@soptcom/1')).toBeTruthy();
    });

    it('url 마지막 문자 / 가 있어도 true를 리턴한다', () => {
      expect(
        validateBrunchURL('https://brunch.co.kr/@soptcom/1/'),
      ).toBeTruthy();
    });
    it('url 마지막 문자에 / 가 2개 라면 false를 리턴한다', () => {
      expect(
        validateBrunchURL('https://brunch.co.kr/@soptcom/1//'),
      ).toBeFalsy();
    });

    it('파라미터가 2개 이상이면 false를 리턴한다.', () => {
      expect(
        validateBrunchURL('https://brunch.co.kr/@soptcom/1/2'),
      ).toBeFalsy();
    });
  });
});
