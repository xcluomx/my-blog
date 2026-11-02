
const { Component } = require('inferno');

class ImageWidget extends Component {
    render() {
        const { widget } = this.props;
        const image = widget.image;

        if (!image) {
            return null;
        }

        return (
            <div class="card widget" style={{ overflow: 'hidden' }}>
                <a
                    href={widget.link || image}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'block' }}
                >
                    <div style={{
                        width: '100%',
                        aspectRatio: '9 / 16',
                        overflow: 'hidden'
                    }}>
                        <img
                            src={image}
                            alt={widget.alt || '图片'}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                display: 'block'
                            }}
                        />
                    </div>
                </a>
            </div>
        );
    }
}

module.exports = ImageWidget;
