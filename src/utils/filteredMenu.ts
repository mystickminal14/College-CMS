import type { MenuItem,  } from "../components/layout/SideBar";
import type { PermissionNameType } from "../login/model/permission";
import { subMenuPermissionMap } from "./subMenuPermission";

// ----------------- FILTER MENUS -----------------
export const filterMenuItems = (
  allMenus: MenuItem[],
  userPermissions: PermissionNameType[],
  role: string
): MenuItem[] => {
  if (role === "SUPERADMIN") return allMenus;

  return allMenus
    .map(menu => {
      // CASE 1: Menu has submenus
      if (menu.subMenus) {
        const filteredSubMenus = menu.subMenus.filter(sub => {
          const requiredPermission = subMenuPermissionMap[sub.id];
          return requiredPermission
            ? userPermissions.includes(requiredPermission)
            : false;
        });

        // Show parent ONLY if it has permitted submenus
        if (filteredSubMenus.length > 0) {
          return {
            ...menu,
            subMenus: filteredSubMenus,
          };
        }

        return null;
      }

      // CASE 2: Menu without submenu (direct permission)
      const directPermission = menu.id.toUpperCase() as PermissionNameType;
      return userPermissions.includes(directPermission) ? menu : null;
    })
    .filter(Boolean) as MenuItem[];
};
