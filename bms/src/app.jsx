import Footer from "@/components/Footer"
import { Question, SelectLang } from "@/components/RightContent"
import { SettingDrawer } from "@ant-design/pro-components"
import { history } from "@umijs/max"
import { tokenStore } from "@/utils/localStorage"
import { AvatarDropdown, AvatarName } from "./components/RightContent/AvatarDropdown"

const loginPath = "/user/login"

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState() {
  return {}
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout = ({ initialState, setInitialState }) => {
  return {
    actionsRender: () => [<Question key="doc" />, <SelectLang key="SelectLang" />],
    avatarProps: {
      src: initialState?.currentUser?.avatar,
      title: <AvatarName />,
      render: (_, avatarChildren) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>
      },
    },
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history
      // 如果没有登录，重定向到 login
      if (!tokenStore.get() && location.pathname !== loginPath) {
        history.push(loginPath)
      }
    },
    layoutBgImgList: [],
    links: [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      return (
        <>
          {children}
          <SettingDrawer
            disableUrlParams
            enableDarkTheme
            settings={initialState?.settings}
            onSettingChange={(settings) => {
              setInitialState((preInitialState) => ({
                ...preInitialState,
                settings,
              }))
            }}
          />
        </>
      )
    },
    ...initialState?.settings,
  }
}