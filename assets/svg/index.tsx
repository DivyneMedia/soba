import React from 'react';
import Svg, {G, Path, Rect, Defs, ClipPath} from 'react-native-svg';
import {View} from 'react-native';
import colors from '../../constants/colors';

const iconNames = {
  ic_tab_home_active: 'ic_tab_home_active',
  ic_tab_home_inactive: 'ic_tab_home_inactive',
  ic_tab_chat_active: 'ic_tab_chat_active',
  ic_tab_chat_inactive: 'ic_tab_chat_inactive',
  ic_tab_vide_library_inactive: 'ic_tab_vide_library_inactive',
  ic_tab_vide_library_active: 'ic_tab_vide_library_active',
  ic_tab_gift_card_inactive: 'ic_tab_gift_card_inactive',
  ic_tab_gift_card_active: 'ic_tab_gift_card_active',
  ic_tab_account_inactive: 'ic_tab_account_inactive',
  ic_tab_account_active: 'ic_tab_account_active',
};

const Icon = ({iconName, style}: { iconName: string, style: any }) => {
  switch (iconName) {
    case iconNames.ic_tab_home_active:
      return (
        <View style={style}>
            <Svg
                width="24"
                height="22"
                viewBox="0 0.8 24 20.4"
                fill="#000000"
            >
                <Svg
                    width="24"
                    height="22"
                    viewBox="0 0.974 23.592 20.053"
                >
                    <Path
                        paint-order="stroke fill markers"
                        fill-rule="evenodd"
                        d="M9.437 21.027v-7.078h4.718v7.078h5.898V11.59h3.539L11.796.974 0 11.59h3.539v9.437h5.898z"
                    />
                </Svg>
            </Svg>
        </View>
      );
    case iconNames.ic_tab_home_inactive:
      return (
        <View style={style}>
          <Svg
            width="20"
            height="21"
            viewBox="0 0.5 20 20"
            fill="#000000"
          >
              <Svg
                width="20"
                height="21"
                viewBox="0 0.974 20 20"
                >
                <Path
                  paint-order="stroke fill markers"
                  fill-rule="evenodd"
                  d="M18 .974H2c-1.1 0-1.99.9-1.99 2l-.01 18 4-4h14c1.1 0 2-.9 2-2v-12c0-1.1-.9-2-2-2zm-14 7h12v2H4v-2zm8 5H4v-2h8v2zm4-6H4v-2h12v2z"
                />
              </Svg>
          </Svg>
        </View>
      )
      case iconNames.ic_tab_home_inactive:
        return (
          <View style={style}>
              <Svg
                  width="24"
                  height="22"
                  viewBox="0 0.8 24 20.4"
                  fill="#000000"
              >
                  <Svg
                      width="24"
                      height="22"
                      viewBox="0 0.974 23.592 20.053"
                  >
                      <Path
                          paint-order="stroke fill markers"
                          fill-rule="evenodd"
                          d="M9.437 21.027v-7.078h4.718v7.078h5.898V11.59h3.539L11.796.974 0 11.59h3.539v9.437h5.898z"
                      />
                  </Svg>
              </Svg>
          </View>
        );
      case iconNames.ic_tab_home_inactive:
        return (
          <View style={style}>
              <Svg
                  width="24"
                  height="22"
                  viewBox="0 0.8 24 20.4"
                  fill="#000000"
              >
                  <Svg
                      width="24"
                      height="22"
                      viewBox="0 0.974 23.592 20.053"
                  >
                      <Path
                          paint-order="stroke fill markers"
                          fill-rule="evenodd"
                          d="M9.437 21.027v-7.078h4.718v7.078h5.898V11.59h3.539L11.796.974 0 11.59h3.539v9.437h5.898z"
                      />
                  </Svg>
              </Svg>
          </View>
        );
      case iconNames.ic_tab_home_inactive:
      return (
        <View style={style}>
            <Svg
                width="24"
                height="22"
                viewBox="0 0.8 24 20.4"
                fill="#000000"
            >
                <Svg
                    width="24"
                    height="22"
                    viewBox="0 0.974 23.592 20.053"
                >
                    <Path
                        paint-order="stroke fill markers"
                        fill-rule="evenodd"
                        d="M9.437 21.027v-7.078h4.718v7.078h5.898V11.59h3.539L11.796.974 0 11.59h3.539v9.437h5.898z"
                    />
                </Svg>
            </Svg>
        </View>
      );
      case iconNames.ic_tab_home_inactive:
      return (
        <View style={style}>
            <Svg
                width="24"
                height="22"
                viewBox="0 0.8 24 20.4"
                fill="#000000"
            >
                <Svg
                    width="24"
                    height="22"
                    viewBox="0 0.974 23.592 20.053"
                >
                    <Path
                        paint-order="stroke fill markers"
                        fill-rule="evenodd"
                        d="M9.437 21.027v-7.078h4.718v7.078h5.898V11.59h3.539L11.796.974 0 11.59h3.539v9.437h5.898z"
                    />
                </Svg>
            </Svg>
        </View>
      );
      case iconNames.ic_tab_home_inactive:
      return (
        <View style={style}>
            <Svg
                width="24"
                height="22"
                viewBox="0 0.8 24 20.4"
                fill="#000000"
            >
                <Svg
                    width="24"
                    height="22"
                    viewBox="0 0.974 23.592 20.053"
                >
                    <Path
                        paint-order="stroke fill markers"
                        fill-rule="evenodd"
                        d="M9.437 21.027v-7.078h4.718v7.078h5.898V11.59h3.539L11.796.974 0 11.59h3.539v9.437h5.898z"
                    />
                </Svg>
            </Svg>
        </View>
      );
      case iconNames.ic_tab_home_inactive:
      return (
        <View style={style}>
            <Svg
                width="24"
                height="22"
                viewBox="0 0.8 24 20.4"
                fill="#000000"
            >
                <Svg
                    width="24"
                    height="22"
                    viewBox="0 0.974 23.592 20.053"
                >
                    <Path
                        paint-order="stroke fill markers"
                        fill-rule="evenodd"
                        d="M9.437 21.027v-7.078h4.718v7.078h5.898V11.59h3.539L11.796.974 0 11.59h3.539v9.437h5.898z"
                    />
                </Svg>
            </Svg>
        </View>
      );
      case iconNames.ic_tab_home_inactive:
      return (
        <View style={style}>
            <Svg
                width="24"
                height="22"
                viewBox="0 0.8 24 20.4"
                fill="#000000"
            >
                <Svg
                    width="24"
                    height="22"
                    viewBox="0 0.974 23.592 20.053"
                >
                    <Path
                        paint-order="stroke fill markers"
                        fill-rule="evenodd"
                        d="M9.437 21.027v-7.078h4.718v7.078h5.898V11.59h3.539L11.796.974 0 11.59h3.539v9.437h5.898z"
                    />
                </Svg>
            </Svg>
        </View>
      );
      case iconNames.ic_tab_home_inactive:
      return (
        <View style={style}>
            <Svg
                width="24"
                height="22"
                viewBox="0 0.8 24 20.4"
                fill="#000000"
            >
                <Svg
                    width="24"
                    height="22"
                    viewBox="0 0.974 23.592 20.053"
                >
                    <Path
                        paint-order="stroke fill markers"
                        fill-rule="evenodd"
                        d="M9.437 21.027v-7.078h4.718v7.078h5.898V11.59h3.539L11.796.974 0 11.59h3.539v9.437h5.898z"
                    />
                </Svg>
            </Svg>
        </View>
      );
    default:
      return null;
  }
};

export {Icon, iconNames};
