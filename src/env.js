//jsonp或cors跨域用env
let baseUrl;
switch (process.env.NODE_ENV) {
	case 'development':
		baseUrl = 'http://';
		break;
	case 'test':
		baseUrl = 'http://';
		break;
	case 'production':
		baseUrl = 'http://';
		break;
	default:
		baseUrl = 'http://';
		break;

}
export default {
	baseUrl
}
