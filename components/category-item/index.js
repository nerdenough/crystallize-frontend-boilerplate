import React from 'react';
import Link from 'next/link';

import { withTranslation } from 'lib/i18n';
import { screen } from 'ui';
import { Outer, Inner, Figure, Img, Footer, Price, imageWidth } from './styles';

const placeHolderImg = '/static/placeholder.png';

class CategoryItem extends React.Component {
  render() {
    const { data, t, key } = this.props;
    const { name, path, variants } = data;

    if (!data) {
      return null;
    }

    const { type } = data;

    if (type === 'folder' || type === 'document') {
      return (
        <Link as={path} key={key} href={`/${type}`} passHref>
          <Outer>
            <Inner onlytext>{name}</Inner>
          </Outer>
        </Link>
      );
    }

    const [{ price, image }] = variants || [];

    return (
      <Link as={path} key={key} href={`/${type}`} passHref>
        <Outer>
          <Inner>
            <Figure>
              <Img
                src={image && image.url ? image.url : placeHolderImg}
                onError={e => {
                  e.target.onerror = null;
                  e.target.src = placeHolderImg;
                }}
                alt={name}
                sizes={`(min-width ${screen.md}px) ${imageWidth.lg}, ${imageWidth.xs}`}
              />
            </Figure>
            <Footer>
              <div>
                <span>{name}</span>
                <Price>
                  {price
                    ? t('currency', { amount: price })
                    : t('currency', { amount: price })}
                </Price>
              </div>
            </Footer>
          </Inner>
        </Outer>
      </Link>
    );
  }
}

export default withTranslation('product')(CategoryItem);
