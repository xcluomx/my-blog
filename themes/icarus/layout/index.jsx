
const { Component, Fragment } = require('inferno');
const Paginator = require('hexo-component-inferno/lib/view/misc/paginator');

const bannerUrl = 'https://jaaxin.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2026/11/144140734_4066398463378370_8363991717714843395_n.jpg';

module.exports = class extends Component {
    render() {
        const { config, page, helper } = this.props;
        const { url_for, date, __ } = helper;

        return <Fragment>
            {/* 首页顶部 Banner */}
            <div class="card home-banner-card">
                <img
                    src={bannerUrl}
                    alt="星罗杂记"
                    class="home-banner-image"
                />
            </div>

            {/* 最新文章栏目 */}
            <div class="card home-posts-card">
                <div class="card-content">
                    <div class="home-section-header">
                        <h2 class="home-section-title">最新文章</h2>
                        <a class="home-more-link" href={url_for('archives/')}>
                            更多 <i class="fas fa-angle-right"></i>
                        </a>
                    </div>

                    <div class="home-post-list">
                        {page.posts.map(post => (
                            <div class="home-post-item">
                                <a
                                    class="home-post-title"
                                    href={url_for(post.link || post.path)}
                                >
                                    {post.title}
                                </a>
                                <time class="home-post-date">
                                    {post.date ? date(post.date, 'YYYY-MM-DD') : ''}
                                </time>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 保留原有分页 */}
            {page.total > 1 ? <Paginator
                current={page.current}
                total={page.total}
                baseUrl={page.base}
                path={config.pagination_dir}
                urlFor={url_for}
                prevTitle={__('common.prev')}
                nextTitle={__('common.next')}
            /> : null}
        </Fragment>;
    }
};
