<?php

declare(strict_types=1);

namespace App\Enums;

enum TeamMemberRole: string
{
    case Leader = 'leader';
    case Member = 'member';

    public function label(): string
    {
        return match ($this) {
            self::Leader => 'Ketua Tim',
            self::Member => 'Anggota Tim',
        };
    }

    /**
     * @return array<string>
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
