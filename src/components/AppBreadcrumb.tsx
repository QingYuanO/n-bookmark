'use client';

import React, { Fragment } from 'react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { getBreadcrumb } from '@/data';

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from './ui/breadcrumb';

export default function AppBreadcrumb() {
  const params = useParams();

  const breadcrumb = getBreadcrumb((params.folderId as string[]) ?? []);

  const pathname = usePathname();

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {(breadcrumb.length > 0 || pathname === '/search') && <BreadcrumbSeparator />}

        {/* 显示搜索 */}
        {pathname === '/search' && (
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <BreadcrumbPage>Search</BreadcrumbPage>
            </BreadcrumbLink>
          </BreadcrumbItem>
        )}

        {/* 显示分类 */}
        {breadcrumb.map((item, index) => (
          <Fragment key={item.link}>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                {index === breadcrumb.length - 1 ? <BreadcrumbPage>{item.name}</BreadcrumbPage> : <Link href={item.link}>{item.name}</Link>}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index !== breadcrumb.length - 1 && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
