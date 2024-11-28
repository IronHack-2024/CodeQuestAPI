const currentProtocol = window.location.protocol;
const currentHost = window.location.hostname;
const currentPort = window.location.port ? `:${window.location.port}` : '';
const apiBaseUrl = `${currentProtocol}//${currentHost}${currentPort}/api/v1/swagger-docs`

window.onload = () => {
  window.ui = SwaggerUIBundle({
    url: apiBaseUrl,
    dom_id: '#swagger-ui',
  });
};