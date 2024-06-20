require "test_helper"

class DocumentsControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get documents_show_url
    assert_response :success
  end
end
